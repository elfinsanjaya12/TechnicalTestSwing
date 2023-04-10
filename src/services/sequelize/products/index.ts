import { Request } from 'express';
import { Op } from 'sequelize';
import { Product } from '../../../database/models';
import { formulaPaginationOffsetLimit } from '../../../utils/formula-pagination-offset-limit';
import { FormatPagination } from '../../../utils/format-pagination';
import { ProductDTO, ProductQueryDTO } from './interfaces/product.dto';
import { NotFoundError } from '../../../errors/not-found-error';
import { DefaultResponse } from './interfaces/product.response';
import { checkingStore } from '../stores';

export const getAllProducts = async (req: Request) => {
  const {
    limit,
    page,
    keyword = '',
    sortOrder = [],
  }: ProductQueryDTO = req.query;

  let condition: any = {};
  if (keyword !== '') {
    condition = { ...condition, title: { [Op.like]: `%${keyword}%` } };
  }

  let convertSortOrder: any = [];
  sortOrder.forEach((sO: any) => {
    convertSortOrder.push([sO.split(' ')[0], sO.split(' ')[1]]);
  });

  const { offset, limitData } = formulaPaginationOffsetLimit(page, limit);

  const count = await Product.count({ where: condition });

  const result: any = await Product.findAll({
    where: condition,
    order: convertSortOrder,
    limit: Number(limitData),
    offset: offset,
  });

  const { pages, total } = FormatPagination(count, limitData);
  return { data: result, total, pages };
};

export const createProduct = async (req: Request) => {
  const { title, url, price, description, storeId }: ProductDTO = req.body;

  const findProduct = await Product.findOne({ where: { title } });

  if (findProduct) throw new NotFoundError('DUPLICATE_TITLE');

  await checkingStore(storeId);

  const result = await Product.create({
    title,
    url,
    price,
    description,
    storeId,
  });

  const response: DefaultResponse = {
    id: result.id,
    url: result.url,
    price: result.price,
    title: result.title,
    description: result.description,
    storeId: result.storeId,
  };

  return { data: response };
};

export const getOnoProduct = async (req: Request) => {
  const { id } = req.params;

  const result = await Product.findOne({
    where: { id },
  });

  if (!result) throw new NotFoundError('PRODUCT_NOT_FOUND');
  return { data: result };
};

export const updateProduct = async (req: Request) => {
  const { id } = req.params;
  const findProduct = await Product.findOne({ where: { id } });

  if (!findProduct) throw new NotFoundError('PRODUCT_NOT_FOUND');

  const { title, url, price, description, storeId }: ProductDTO = req.body;

  const checkingProduct = await Product.findOne({
    where: { title, id: { [Op.ne]: id } },
  });

  if (checkingProduct) throw new NotFoundError('DUPLICATE_TITLE');

  await checkingStore(storeId);

  findProduct.url = url;
  findProduct.title = title;
  findProduct.price = price;
  findProduct.description = description;
  findProduct.storeId = storeId;
  await findProduct.save();

  const response: DefaultResponse = {
    id: findProduct.id,
    url: findProduct.url,
    price: findProduct.price,
    title: findProduct.title,
    description: findProduct.description,
    storeId: findProduct.storeId,
  };

  return { data: response };
};

export const deleteProduct = async (req: Request) => {
  const { id } = req.params;

  const findProduct = await Product.findOne({
    where: { id },
  });

  if (!findProduct) throw new NotFoundError('STORE_NOT_FOUND');

  await findProduct.destroy();

  const response: DefaultResponse = {
    id: findProduct.id,
    url: findProduct.url,
    price: findProduct.price,
    title: findProduct.title,
    description: findProduct.description,
    storeId: findProduct.storeId,
  };

  return { data: response };
};

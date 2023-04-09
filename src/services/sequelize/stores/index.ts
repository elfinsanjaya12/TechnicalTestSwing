import { Request } from 'express';
import { Op } from 'sequelize';
import { Store } from '../../../database/models';
import { formulaPaginationOffsetLimit } from '../../../utils/formula-pagination-offset-limit';
import { FormatPagination } from '../../../utils/format-pagination';
import { StoreDTO } from './interfaces/store.dto';
import { NotFoundError } from '../../../errors/not-found-error';
import { DefaultResponse } from './interfaces/store.response';

export const getAllStores = async (req: Request) => {
  const { limit, page, keyword = '' } = req.query;

  let condition: any = {};
  if (keyword !== '') {
    condition = { ...condition, name: { [Op.like]: `%${keyword}%` } };
  }

  const { offset, limitData } = formulaPaginationOffsetLimit(page, limit);

  const count = await Store.count({ where: condition });

  const result: any = await Store.findAll({
    where: condition,
    order: [['createdAt', 'DESC']],
    limit: Number(limitData),
    offset: offset,
  });

  const { pages, total } = FormatPagination(count, limitData);
  return { data: result, total, pages };
};

export const createStore = async (req: Request) => {
  const {
    address,
    url,
    phone,
    name,
    operationalTimeEnd,
    operationalTimeStart,
  }: StoreDTO = req.body;

  const findStore = await Store.findOne({ where: { name } });

  if (findStore) throw new NotFoundError('DUPLICATE_NAME');

  const result = await Store.create({
    address,
    url,
    name,
    phone,
    operationalTimeEnd,
    operationalTimeStart,
  });

  const response: DefaultResponse = {
    id: result.id,
    url: result.url,
    phone: result.phone,
    address: result.address,
    name: result.name,
    operationalTimeEnd: result.operationalTimeEnd,
    operationalTimeStart: result.operationalTimeStart,
  };

  return { data: response };
};

export const getOnoStoreEbook = async (req: Request) => {
  const { id } = req.params;

  const result = await Store.findOne({
    where: { id },
  });

  if (!result) throw new NotFoundError('STORE_NOT_FOUND');
  return { data: result };
};

export const updateStore = async (req: Request) => {
  const { id } = req.params;
  const findStore = await Store.findOne({ where: { id } });

  if (!findStore) throw new NotFoundError('STORE_NOT_FOUND');

  const {
    address,
    url,
    name,
    phone,
    operationalTimeEnd,
    operationalTimeStart,
  }: StoreDTO = req.body;
  const checkingStore = await Store.findOne({
    where: { name, id: { [Op.ne]: id } },
  });

  if (checkingStore) throw new NotFoundError('DUPLICATE_NAME');

  findStore.name = name;
  findStore.url = url;
  findStore.address = address;
  findStore.phone = phone;
  findStore.operationalTimeEnd = operationalTimeEnd;
  findStore.operationalTimeStart = operationalTimeStart;
  await findStore.save();

  const response: DefaultResponse = {
    id: findStore.id,
    url: findStore.url,
    phone: findStore.phone,
    address: findStore.address,
    name: findStore.name,
    operationalTimeEnd: findStore.operationalTimeEnd,
    operationalTimeStart: findStore.operationalTimeStart,
  };

  return { data: response };
};

export const deleteStore = async (req: Request) => {
  const { id } = req.params;

  const findStore = await Store.findOne({
    where: { id },
  });

  if (!findStore) throw new NotFoundError('STORE_NOT_FOUND');

  await findStore.destroy();

  const response: DefaultResponse = {
    id: findStore.id,
    url: findStore.url,
    phone: findStore.phone,
    address: findStore.address,
    name: findStore.name,
    operationalTimeEnd: findStore.operationalTimeEnd,
    operationalTimeStart: findStore.operationalTimeStart,
  };

  return { data: response };
};

import { Request } from 'express';
import { Op } from 'sequelize';
import { Category } from '../../../database/models';
import { formulaPaginationOffsetLimit } from '../../../utils/formula-pagination-offset-limit';
import { FormatPagination } from '../../../utils/format-pagination';
import { DefaultResponse } from './interfaces/category.response';
import { CategoryDTO } from './interfaces/category.dto';
import { NotFoundError } from '../../../errors/not-found-error';

export const getAllCategories = async (req: Request) => {
  const { limit, page, keyword = '' } = req.query;

  let condition: any = {};
  if (keyword !== '') {
    condition = { ...condition, name: { [Op.like]: `%${keyword}%` } };
  }

  const { offset, limitData } = formulaPaginationOffsetLimit(page, limit);

  const count = await Category.count({ where: condition });

  const result = await Category.findAll({
    where: condition,
    attributes: ['id', 'name', 'createdAt'],
    order: [['createdAt', 'DESC']],
    limit: Number(limitData),
    offset: offset,
  });

  const { pages, total } = FormatPagination(count, limitData);
  return { data: result, total, pages };
};

export const createCategory = async (req: Request) => {
  const { name }: CategoryDTO = req.body;

  const chekcingName = await Category.findOne({
    where: { name },
  });

  if (chekcingName) throw new NotFoundError('DUPLICATE_NAME');

  const result = await Category.create({ name, status: 'Y' });

  const response: DefaultResponse = {
    id: result.id,
    name: result.name,
  };

  return { data: response };
};

export const getOneCategory = async (req: Request) => {
  const { id } = req.params;

  const result = await Category.findOne({ where: { id } });

  if (!result) throw new NotFoundError('CATEGORY_NOT_FOUND');
  return { data: result };
};

export const updateCategory = async (req: Request) => {
  const { id } = req.params;
  const checkingCategory = await Category.findOne({ where: { id } });

  if (!checkingCategory) throw new NotFoundError('CATEGORY_NOT_FOUND');

  const { name }: CategoryDTO = req.body;

  const checkingCategoryName = await Category.findOne({
    where: { name, id: { [Op.ne]: id } },
  });

  if (checkingCategoryName) throw new NotFoundError('DUPLICATE_NAME');

  checkingCategory.name = name;
  await checkingCategory.save();

  const response: DefaultResponse = { id, name: name || checkingCategory.name };

  return { data: response };
};

export const deleteCategory = async (req: Request) => {
  const { id } = req.params;

  const checkingCategory = await Category.findOne({
    where: { id },
  });

  if (!checkingCategory) throw new NotFoundError('CATEGORY_NOT_FOUND');

  await checkingCategory.destroy();

  const response: DefaultResponse = {
    id: id,
    name: checkingCategory.name,
  };

  return { data: response };
};

export const checkingCategory = async (id: string) => {
  const result = await Category.findOne({ where: { id } });

  if (!result) throw new NotFoundError('CATEGORY_NOT_FOUND');
  return { data: result };
};

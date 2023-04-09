import { Request } from 'express';
import path from 'path';
import fs from 'fs';
import { Op } from 'sequelize';
import { CourseEbook, TypeCourse, Category } from '../../../database/models';
import { formulaPaginationOffsetLimit } from '../../../utils/formula-pagination-offset-limit';
import { FormatPagination } from '../../../utils/format-pagination';
import { CourseEbookrDTO } from './interfaces/course-ebooks.dto';
import { NotFoundError } from '../../../errors/not-found-error';
import { DefaultResponse } from './interfaces/course-ebooks.response';
import { checkingCategory } from '../categories';
import { checkingTypeCourse } from '../type-courses';

export const getAllCourseEbooks = async (req: Request) => {
  const { limit, page, keyword = '' } = req.body;

  let condition: any = {};
  if (keyword !== '') {
    condition = { ...condition, title: { [Op.like]: `%${keyword}%` } };
  }

  const { offset, limitData } = formulaPaginationOffsetLimit(page, limit);

  const count = await CourseEbook.count({ where: condition });

  const result: any = await CourseEbook.findAll({
    where: condition,
    include: [{ model: TypeCourse }, { model: Category }],
    order: [['createdAt', 'DESC']],
    limit: Number(limitData),
    offset: offset,
  });

  const { pages, total } = FormatPagination(count, limitData);
  return { data: result, total, pages };
};

export const createCourseEbook = async (req: Request) => {
  const { title, level, typeCourseId, categoryId }: CourseEbookrDTO = req.body;

  const findCourseEbook = await CourseEbook.findOne({ where: { title } });

  if (findCourseEbook) throw new NotFoundError('DUPLICATE_TITLE');

  await checkingCategory(categoryId);
  await checkingTypeCourse(typeCourseId);

  const result = await CourseEbook.create({
    file: req.file ? `/pdf/${req!.file!.filename}` : '',
    title,
    level,
    status: 'N',
    typeCourseId,
    categoryId,
  });

  const response: DefaultResponse = {
    id: result.id,
    file: result.file,
    title: result.title,
    level: result.level,
    status: result.status,
    typeCourseId: result.typeCourseId,
    categoryId: result.categoryId,
  };

  return { data: response };
};

export const getOnoCourseEbook = async (req: Request) => {
  const { id } = req.params;

  const result = await CourseEbook.findOne({
    where: { id },
    include: [{ model: TypeCourse }, { model: Category }],
  });

  if (!result) throw new NotFoundError('COURSE_EBOOK_NOT_FOUND');
  return { data: result };
};

export const updateCourseEbook = async (req: Request) => {
  const { id } = req.params;
  const findCourseEbook = await CourseEbook.findOne({ where: { id } });

  if (!findCourseEbook) throw new NotFoundError('COURSE_EBOOK_NOT_FOUND');

  const { title, level, typeCourseId, categoryId }: CourseEbookrDTO = req.body;
  const checkingCourseEbook = await CourseEbook.findOne({
    where: { title, id: { [Op.ne]: id } },
  });

  if (checkingCourseEbook) throw new NotFoundError('DUPLICATE_TITLE');

  await checkingCategory(categoryId);
  await checkingTypeCourse(typeCourseId);

  if (req.file) {
    let currentImage = path.resolve(
      __dirname,
      `../../../../public/${findCourseEbook.file}`
    );

    if (findCourseEbook.file !== '') {
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }
    }

    findCourseEbook.file = `/pdf/${req!.file!.filename}`;
  }

  findCourseEbook.title = title;
  findCourseEbook.level = level;
  findCourseEbook.typeCourseId = typeCourseId;
  findCourseEbook.categoryId = categoryId;
  await findCourseEbook.save();

  const response: DefaultResponse = {
    id: findCourseEbook.id,
    file: findCourseEbook.file,
    title: findCourseEbook.title,
    level: findCourseEbook.level,
    typeCourseId: findCourseEbook.typeCourseId,
    categoryId: findCourseEbook.categoryId,
  };

  return { data: response };
};

export const deleteCourseBook = async (req: Request) => {
  const { id } = req.params;

  const findCourseEbook = await CourseEbook.findOne({
    where: { id },
  });

  if (!findCourseEbook) throw new NotFoundError('COURSE_EBOOK_NOT_FOUND');

  await findCourseEbook.destroy();

  let currentImage = path.resolve(
    __dirname,
    `../../../../public/${findCourseEbook.file}`
  );

  if (fs.existsSync(currentImage)) {
    fs.unlinkSync(currentImage);
  }

  const response: DefaultResponse = {
    id: findCourseEbook.id,
    file: findCourseEbook.file,
    title: findCourseEbook.title,
    level: findCourseEbook.level,
    typeCourseId: findCourseEbook.typeCourseId,
    categoryId: findCourseEbook.categoryId,
  };

  return { data: response };
};

import {
  createAccomodationQuery,
  deleteAccomodationQuery,
  getAccomodationByIdQuery,
  getAccomodationsQuery,
  updateAccomodationQuery,
  type Accomodation,
} from "../models/Accomodation";

export const getAccomodationsDB = async () => {
  const result = await getAccomodationsQuery();
  return result;
};

export const getAccomodationByIdDB = async (id: number) => {
  const result = await getAccomodationByIdQuery(id);
  return result;
};

export const createAccomodationDB = async (accomodation: Accomodation) => {
  const result = await createAccomodationQuery(accomodation);
  return result;
};

export const updateAccomodationDB = async (
  id: number,
  accomodation: Accomodation
) => {
  const result = await updateAccomodationQuery(id, accomodation);
  console.log(701, result);
  return result;
};

export const deleteAccomodationDB = async (id: number) => {
  const result = await deleteAccomodationQuery(id);
  return result;
};

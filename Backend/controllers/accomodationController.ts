import { type Accomodation } from "./../models/Accomodation";
import type { Request, Response } from "express";
import {
  createAccomodationDB,
  deleteAccomodationDB,
  getAccomodationByIdDB,
  getAccomodationsDB,
  updateAccomodationDB,
} from "../services/accomodationService";
import { log } from "console";

export const getAllAccomodations = async (req: Request, res: Response) => {
  try {
    const accomodations = await getAccomodationsDB();
    res.status(200).json(accomodations);
  } catch (error) {
    log(error);
  }
};

export const getAccomodationById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const accomodation = await getAccomodationByIdDB(id);
    res.status(200).json(accomodation);
  } catch (error) {
    log(error);
  }
};

export const createAccomodation = async (req: Request, res: Response) => {
  try {
    const accomodationBody = req.body as Accomodation;
    console.log("Accomodation body @controller",accomodationBody);
    const accomodation = await createAccomodationDB(accomodationBody);
    res.status(201).json(accomodation);
  } catch (error) {
    log(error);
  }
};

export const updateAccomodation = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const accomodationBody = req.body as Accomodation;
    const accomodation = await updateAccomodationDB(id, accomodationBody);
    res.status(200).json(accomodation);
  } catch (error) {
    log(error);
  }
};

export const deleteAccomodation = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await deleteAccomodationDB(id);
    res.sendStatus(204);
  } catch (error) {
    log(error);
  }
};

import {NextFunction, Request, Response} from "express";
import PasteRepository, {Paste} from "../models/paste";
import {Types} from "mongoose";

function body(doc: { text: string, _id: Types.ObjectId | string }) {
  return {
    _id: doc._id,
    text: doc.text,
  };
}

export function createPaste(req: Request, res: Response, next: NextFunction) {
  const {text, key} = req.body;
  Promise.resolve()
    .then(() => {
      if (!text) throw new Error("NOT ENOUGH DETAILS!");
    })
    .then(() => PasteRepository.create({text, key}))
    .then(created => res.status(200).json(body(created)))
    .catch(err => {
      next(err);
    });
}

export function getPasteById(req: Request, res: Response, next: NextFunction) {
  const {_id} = req.params;
  Promise.resolve()
    .then(() => {
      if (!_id) throw new Error("NOT ENOUGH DETAILS!");
    })
    .then(() => PasteRepository.findById(_id))
    .then(p => {
      if (!p) throw new Error("POST NOT FOUND");
      return p;
    })
    .then(p => res.status(200).json(body(p)))
    .catch(err => {
      next(err);
    });
}

export function updatePasteById(req: Request, res: Response, next: NextFunction) {
  const {_id} = req.params;
  const {text, key} = req.body;
  Promise.resolve()
    .then(() => {
      if (!_id || !text || !key) throw new Error("NOT ENOUGH DETAILS!");
    })
    .then(() => PasteRepository.findById(_id))
    .then(paste => {
      if (!paste) throw new Error("POST NOT FOUND");
      if (!paste.key || paste.key==="") throw new Error("READ-ONLY PASTE");
      if (paste.key !== key) throw new Error("INCORRECT KEY");
      paste.text = text;
      return paste.save();
    })
    .then(p => res.status(200).json(body(p)))
    .catch(err => {
      next(err);
    });
}
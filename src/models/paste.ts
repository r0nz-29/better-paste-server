import {model, Schema} from "mongoose";

export type Paste = {
  _id: string;
  text: string;
  key?: string;
}

const pasteSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  key: String,
}, {timestamps: true});


const PasteRepository = model("Paste", pasteSchema);
export default PasteRepository;
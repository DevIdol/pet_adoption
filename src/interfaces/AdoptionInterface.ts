import { Types } from "mongoose";

export interface AdoptionInterface {
  userId?: Types.ObjectId;
  contentType?: String;
  imageBase64?: String;
  name?: String;
  breed?: String;
  kind?: String;
  age?: String;
  size?: String;
  sex?: String;
  desc?: String;
}
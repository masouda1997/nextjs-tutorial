export interface faqModel {
   result?: string;
   data?: data[];
   message?: message[];
 }

 export interface data {
   questionId?: string;
   applicationId?: string;
   title?: string;
   description?: string;
   order?: number;
   key?: string | number;
   isNewRecord?: boolean;
 }

 export interface message {
   name?: string;
   value?: string;
   resourceNotFound?: boolean;
   searchedLocation?: string;
 }

 export interface faqModelParams {
   appId?: string;
   start?:number;
   length?:number;
 }

 export interface DataType {
  id: number;
  question: string;
  answer: string;
  category: string;
  status: string;
  created_at: Date | string;
  updated_at: Date | string;
}
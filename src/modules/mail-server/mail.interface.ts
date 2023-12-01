export interface IMailProps {
  to: string | Array<string>;
  subject: string;
  template?: string;
  data: {
    userName?: string;
    htmlTitle: string;
    header: string;
    text: string;
    addText?: string;
    c2a_link?: string;
    c2a_button?: string;
    products?: IProductsMail[];
  };
}

export interface IProductsMail {
  id: string;
  name: string;
  quantity: number;
  minimum: number;
}

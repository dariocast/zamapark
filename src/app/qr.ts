import {QRType} from './qrtype.enum';

export interface QR {
  type: QRType;
  createdBy: string;
  payload: {
    item: string; // oggetto acquistato
    price: string; // prezzo pagato
  };
}

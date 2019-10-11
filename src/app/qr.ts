import {QRType} from './qrtype.enum';

export interface QR {
  type: QRType;
  createdBy: string;
  payload: {
    mimetype: string;
    body: string;
  };
}

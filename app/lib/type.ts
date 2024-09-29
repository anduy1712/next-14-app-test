export class THttpError extends Error {
  status: number;
  message: string;

  constructor({ status, message }: { status: number; message: any }) {
    super("Http error");
    this.status = status;
    this.message = message;
  }
}

interface CustomErrorOptions {
  message: string;
  status: number;
}

export class CustomError extends Error {
  public status: number;

  constructor({ message, status }: CustomErrorOptions) {
    super(message);
    this.status = status;
    this.name = this.constructor.name; // Đặt tên của lỗi để dễ dàng nhận diện
    Error.captureStackTrace(this, this.constructor); // Ghi lại stack trace
  }

  // Nếu muốn, có thể override phương thức toString() để cung cấp thông tin chi tiết hơn
  public toString(): string {
    return `${this.name}: ${this.message} (Status: ${this.status})`;
  }
}

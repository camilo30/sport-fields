export interface BookingType{
  code: string;
  desc: string;
}

export interface BookingStatus{
  code: string;
  name: string;
  desc: string;
}

export interface DniType{
  code: string;
  desc: string;
}

export interface UserType{
  code: string;
  desc: string;
  internal: boolean;
  public: boolean;
}

export interface Role{
  name: string;
}

export interface AttachmentType{
  code: string;
  desc: string;
}

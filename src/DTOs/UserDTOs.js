export class RegisterUserDTO {
  name;
  email;
  password;
  avatarUrl;

  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.avatarUrl = data.avatarUrl;
  }
}

export class LoginUserDTO {
  email;

  constructor(data) {
    this.email = data.email;
  }
}

export class GetMeDTO {
  userId;

  constructor(data) {
    this.userId = data.userId;
  }
}

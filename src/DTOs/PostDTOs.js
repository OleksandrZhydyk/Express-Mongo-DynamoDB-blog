export class GetOneWithLikesPostDTO {
  postId;
  viewsCount;
  new;

  constructor(data) {
    this.postId = data.postId;
    this.viewsCount = 1;
    this.new = true;
  }
}

export class GetOneDeletePostDTO {
  postId;

  constructor(data) {
    this.postId = data.postId;
  }
}

export class GetOnePostOutputDTO {
  postId;

  constructor(data) {
    this.postId = data.postId;
  }
}

export class UpdatePostDTO {
  postId;
  title;
  text;
  tags;
  imageUrl;
  userId;

  constructor(data) {
    this.postId = data.postId;
    this.title = data.body.title;
    this.text = data.body.text;
    this.tags = data.body.tags;
    this.imageUrl = data.body.imageUrl;
    this.userId = data.userId;
  }
}

export class CreatePostDTO {
  title;
  text;
  tags;
  imageUrl;
  userId;
  updatedAt;
  createdAt;

  constructor(data) {
    this.title = data.body.title;
    this.text = data.body.text;
    this.tags = data.body.tags;
    this.imageUrl = data.body.imageUrl;
    this.userId = data.userId;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}

export class GetPostOutputDTO {
  id;
  title;
  text;
  tags;
  imageUrl;
  user;
  createdAt;
  updatedAt;

  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.text = data.text;
    this.tags = data.tags;
    this.imageUrl = data.imageUrl;
    this.user = data.user;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}

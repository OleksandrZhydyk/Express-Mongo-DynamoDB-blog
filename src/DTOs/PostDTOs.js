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

  constructor(data) {
    this.title = data.body.title;
    this.text = data.body.text;
    this.tags = data.body.tags;
    this.imageUrl = data.body.imageUrl;
    this.userId = data.userId;
  }
}

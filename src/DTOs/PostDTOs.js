export class GetOneWithLikesPostDTO {
  postId;
  viewsCount;
  new;

  constructor(data) {
    this.postId = data.napostIdme;
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
    this.title = data.title;
    this.text = data.text;
    this.tags = data.tags;
    this.imageUrl = data.imageUrl;
    this.userId = data.userId;
  }
}

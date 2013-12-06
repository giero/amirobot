/**
 * @param integer x
 * @param integer y
 */
Robot.prototype.move = function (x, y) {
    if (this.blocked == true) {
        return;
    }

    this.position = {
        x: x,
        y: y
    }

    this.draw();
};

/**
 * move left 1px
 */
Robot.prototype.moveLeft = function () {
    var x = this.position.x-1;
    this.move(x, this.position.y);
};

/**
 * move right 1px
 */
Robot.prototype.moveRight = function () {
    var x = this.position.x+1;
    this.move(x, this.position.y);
}

/**
 * move top 1px
 */
Robot.prototype.moveTop = function () {
    var y = this.position.y-1;
    this.move(this.position.x, y);
};

/**
 * move down 1px
 */
Robot.prototype.moveBottom = function () {
    var y = this.position.y+1;
    this.move(this.position.x, y);
};

/**
 * follow another robot
 */
Robot.prototype.follow = function () {
    var followed = robots[this.followed],
        followedPosition = followed.position,
        collision = new Collision(this.position, followedPosition);

    if (this.blocked == true) {
        return;
    }

    if (collision.isClose(2)) {
        this.block();
    }
    if (this.position.x == this.limit.x) {
        this.moveLeft();
    }

    if (this.position.y == this.limit.y) {
        this.moveTop();
    }

    if (this.position.x == 0) {
        this.moveRight();
    }

    if (this.position.y == 0) {
        this.moveBottom();
    }

    if (this.position.y == 0
        || this.position.x == 0
        || this.position.x == this.limit.x
        || this.position.y == this.limit.y) {
        return;
    }

    if (this.position.x > followedPosition.x) {
        this.moveLeft();
    } else {
        this.moveRight();
    }

    if (this.position.y > followedPosition.y) {
        this.moveTop();
    } else {
        this.moveBottom();
    }
};

Robot.prototype.block = function () {
    this.blocked = true;
    $(window).trigger("blockRobot");
}
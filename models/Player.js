/**
 * Validate name  from form login
 * If errors return the message
 */
function validateName(name, errors) {
  if (!name) {
    return errors.push("Username require in this field");
  }
  return name;
}

/**
 * Validate password  from form login
 * If errors return the message
 */
function validatePassword(password, errors) {
  if (!password) {
    return errors.push("Password require in this field");
  }
  return password;
}

class Player {
  static from(obj) {
    if (!obj) {
      return null;
    }
    let { name, password } = obj;
    const errors = [];

    name = validateName(name, errors);
    password = validatePassword(password, errors);

    if (errors.length) {
      return {
        errors,
        data: null
      };
    }

    const player = new Player();
    player.name = name;
    player.password = password;

    return {
      errors: null,
      data: player
    };
  }

  // Create Constructor
  constructor() {
    this.name = "";
    this.password = "";
  }
}

exports.Player = Player

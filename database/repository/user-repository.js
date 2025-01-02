const Profile = require("../models/Profile");
const User = require("../models/User");

class UserRepository {
  async CreateUser({ email, password, phone, role }) {
    const user = await User.create({
      email,
      password,
      phone,
      role
    });
    return user;
  }

  async CreateProfile({ _id, ...profileData }) {
    try {
      const user = await User.findByPk(_id);
      if (!user) {
        throw new Error('User not found');
      }

      const profile = await Profile.create({
        ...profileData,
        user_id: _id
      });

      return await User.findByPk(_id, {
        include: [{ model: Profile, as: 'profile' }]
      });
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }

  async EditProfile({ _id, ...profileData }) {
    try {
      const user = await User.findByPk(_id, {
        include: [{ model: Profile, as: 'profile' }]
      });

      if (!user || !user.profile) {
        throw new Error('User or profile not found');
      }

      await Profile.update(profileData, {
        where: { id: user.profile.id }
      });

      return await User.findByPk(_id, {
        include: [{ model: Profile, as: 'profile' }]
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  async FindUser({ email }) {
    return await User.findOne({
      where: { email },
      include: [{ model: Profile, as: 'profile' }]
    });
  }

  async FindUserById({ id }) {
    return await User.findByPk(id, {
      include: [{ model: Profile, as: 'profile' }]
    });
  }

  async AddToWishlist(_id, product) {
    const user = await User.findByPk(_id);
    if (user) {
      const wishlist = user.wishlist || [];
      wishlist.push(product);
      await user.update({ wishlist });
      return await User.findByPk(_id);
    }
  }

  async AddToCart(_id, product) {
    const user = await User.findByPk(_id);
    if (user) {
      const cart = user.cart || [];
      cart.push(product);
      await user.update({ cart });
      return await User.findByPk(_id);
    }
  }

  async RemoveFromCart(_id, product_id) {
    const user = await User.findByPk(_id);
    if (user) {
      const cart = user.cart || [];
      const index = cart.findIndex(item => item.product._id === product_id);
      if (index > -1) {
        cart.splice(index, 1);
        await user.update({ cart });
      }
      return await User.findByPk(_id);
    }
  }

  async AddOrderToProfile(userId, order) {
    const user = await User.findByPk(userId);
    if (user) {
      const orders = user.orders || [];
      orders.push(order);
      await user.update({ orders });
      return await User.findByPk(userId);
    }
  }
}

module.exports = UserRepository;

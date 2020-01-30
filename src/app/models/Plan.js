import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.DOUBLE
      },
      {
        sequelize
      }
    );

    this.addHook('beforeSave', async plans => {
      plans.weight = parseFloat(await plans.duration.toFixed(2));
      plans.height = parseFloat(await plans.price.toFixed(3));
    });

    this.addHook('beforeUpdate', async plans => {
      plans.weight = parseFloat(await plans.duration.toFixed(2));
      plans.height = parseFloat(await plans.price.toFixed(2));
    });
  }
}

export default Plan;

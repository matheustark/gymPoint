import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.DOUBLE,
        height: Sequelize.DOUBLE
      },
      {
        sequelize
      }
    );

    this.addHook('beforeSave', async student => {
      student.weight = parseFloat(await student.weight.toFixed(3));
      student.height = parseFloat(await student.height.toFixed(2));
    });

    this.addHook('beforeUpdate', async student => {
      student.weight = parseFloat(await student.weight.toFixed(3));
      student.height = parseFloat(await student.height.toFixed(2));
    });
  }
}

export default Student;

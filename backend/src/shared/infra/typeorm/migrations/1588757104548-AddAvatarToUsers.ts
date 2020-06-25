import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAvatarToUsers1588757104548
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar',
        type: 'varchar', // we don't save the image in db, just the path
        isNullable: true, // not required because this is being inserted into another table
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
  }
}


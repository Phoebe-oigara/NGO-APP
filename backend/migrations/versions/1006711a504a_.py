"""empty message

Revision ID: 1006711a504a
Revises: 8c36367d4053
Create Date: 2023-07-31 15:48:06.447287

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1006711a504a'
down_revision = '8c36367d4053'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('ngotb_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key(None, 'ngotb', ['ngotb_id'], ['id'])
        batch_op.drop_column('ngotb_Id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('ngotb_Id', sa.INTEGER(), nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key(None, 'ngotb', ['ngotb_Id'], ['id'])
        batch_op.drop_column('ngotb_id')

    # ### end Alembic commands ###

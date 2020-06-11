class AddIconToPet < ActiveRecord::Migration[6.0]
  def change
    add_column :pets, :icon, :string
  end
end

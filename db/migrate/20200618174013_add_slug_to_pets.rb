class AddSlugToPets < ActiveRecord::Migration[6.0]
  def change
    add_column :pets, :slug, :string
    add_index :pets, :slug, unique: true
  end
end

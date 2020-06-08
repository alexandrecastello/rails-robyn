class CreateSpotteds < ActiveRecord::Migration[6.0]
  def change
    create_table :spotteds do |t|
      t.string :address
      t.float :latitude
      t.float :longitude
      t.time :time
      t.string :comments
      t.string :seen_or_rescued
      t.references :user, null: false, foreign_key: true
      t.references :pet, null: false, foreign_key: true

      t.timestamps
    end
  end
end

exports.up = async function (knex, Promise) {
  await knex.raw(`
  
  CREATE OR REPLACE FUNCTION trigger_set_updated_at()
		RETURNS TRIGGER AS $$
		BEGIN
			NEW.updated_at = NOW();
			RETURN NEW;
		END;
		$$ LANGUAGE plpgsql;

  `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(`
    
  `);
};

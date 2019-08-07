import React from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';

const RecipeSearch = ({ onChange, onSubmit }) => {
  return (
    <Grid columns={1} style={{ marginTop: '2rem' }}>
      <Grid.Row centered>
        <Grid.Column width={8}>
          <Form>
            <Form.Field>
              <label>What do you want to eat?</label>
              <input placeholder="Ex: Burrito" onChange={onChange} />
            </Form.Field>
            <Button type="submit" color="green" onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RecipeSearch;

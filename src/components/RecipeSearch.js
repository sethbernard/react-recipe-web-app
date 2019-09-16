import React from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';

const RecipeSearch = ({ onChange, onSubmit }) => {
  return (
    <Grid columns={1}>
      <Grid.Row centered>
        <Grid.Column mobile={12} tablet={8} computer={6}>
          <Segment padded="very" raised>
            <Form>
              <Form.Field>
                <label>What do you want to eat?</label>
                <input placeholder="Ex: Pulled Pork" onChange={onChange} />
              </Form.Field>
              <Button
                type="submit"
                onClick={onSubmit}
                style={{ backgroundColor: '#09186A', color: '#fff' }}
              >
                Submit
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RecipeSearch;

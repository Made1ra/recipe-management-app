import styled from 'styled-components';
import Heart from './Heart';
import { toggleRecipe } from '../store';
import { useDispatch } from 'react-redux';

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledRecipe = styled.div`
    width: 30%;
    padding: 0.5em 0.5em 0.5em;
    margin: 0.5em 0;
    border: 0.1em solid black;
    border-radius: 1%;
    background-color: white;

    @media (max-width: 1200px) {
        width: 50%;
    }

    @media (max-width: 992px) {
        width: 60%;
    }

    @media (max-width: 768px) {
        width: 75%;
    }

    @media (max-width: 576px) {
        width: 80%;
    }
`;

const StyledImage = styled.img`
    border: 0.1em solid black;
    border-radius: 1%;

    @media (max-width: 1200px) {
        width: 30%;
    }

    @media (max-width: 992px) {
        width: 40%;
    }

    @media (max-width: 768px) {
        width: 50%;
    }

    @media (max-width: 576px) {
        width: 60%;
    }
`;

const FavoriteButtonContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
    font-size: 24px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    color: ${(props) => (props.isFavorite ? 'red' : 'lightgrey')};
`;

interface RecipeProps {
    id: string;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    image?: string;
    isFavorite: boolean;
}

function Recipe({
    id,
    title,
    description,
    ingredients,
    instructions,
    image,
    isFavorite
}: RecipeProps) {
    const dispatch = useDispatch();

    return (
        <Container>
            <StyledRecipe>
                <FavoriteButtonContainer>
                    <FavoriteButton isFavorite={isFavorite} onClick={() => dispatch(toggleRecipe(id))}>
                        <Heart />
                    </FavoriteButton>
                </FavoriteButtonContainer>

                <h2>{title}</h2>

                {image && <StyledImage src={image} alt="Recipe" width="150px" height="150px" />}

                <p>{description}</p>

                <h3>Ingredients:</h3>
                <p>
                    {ingredients}
                </p>

                <h3>Instructions:</h3>
                <p>
                    {instructions}
                </p>
            </StyledRecipe>
        </Container >
    );
};

export default Recipe;

import { useState } from 'react';
import styled from 'styled-components';
import Recipe from './Recipe';
import { useSelector } from 'react-redux';
import { RootState, signOut } from '../store';
import { useDispatch } from 'react-redux';

interface RecipeType {
    id: string;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    image?: string;
    isFavorite: boolean;
}

const StyledHeader = styled.h1`
    display: flex;
    justify-content: center;
`;

const StyledButton = styled.button`
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #eee;
    margin-right: 1rem;

    &.active-filter {
        background-color: #00c853;
        color: #fff;
        cursor: pointer;
    }

    &.inactive-filter {
        background-color: #eee;
        color: #333;
        cursor: pointer;
        margin-right: 1rem;
    }

    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }

    @media (max-width: 576px) {
        margin-left: 1%;
    }
`;

const Filters = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    margin: 1em;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
`;

const Message = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem;
    padding-top: 4rem;
    font-size: 1.5rem;
`;

const SignOutButtonContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
`;

const SignOutButton = styled.button`
    margin-top: 1em;
    margin-right: 1em;
    padding: 0.5em 1em;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5%;
    font-size: 16px;
    font-weight: bold;
    
    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;

type Filter = 'All' | 'Favorites';

function Recipes() {
    const recipes = useSelector((state: RootState) => state.recipes);
    const dispatch = useDispatch();

    const [filter, setFilter] = useState<Filter>('All');

    function changeFilter(filter: Filter) {
        setFilter(filter);
    }

    let updatedRecipes: RecipeType[] = [];

    if (filter === 'All') {
        updatedRecipes = recipes.recipes;
    } else if (filter === 'Favorites') {
        updatedRecipes = recipes.recipes.filter((recipe) => recipe.isFavorite);
    }

    return (
        <>
            <SignOutButtonContainer>
                <SignOutButton onClick={() => dispatch(signOut())}>Sign Out</SignOutButton>
            </SignOutButtonContainer>
            <StyledHeader>Recipes</StyledHeader>
            <Filters>
                <StyledButton
                    className={filter === 'All' ? 'active-filter' : 'inactive-filter'}
                    onClick={() => changeFilter('All')}
                >
                    All
                </StyledButton>
                <StyledButton
                    className={filter === 'Favorites' ? 'active-filter' : 'inactive-filter'}
                    onClick={() => changeFilter('Favorites')}
                >
                    Favorites
                </StyledButton>
            </Filters>
            {updatedRecipes.length === 0 ? <Message>There is no recipe yet</Message> : (
                updatedRecipes.map((recipe) => (
                    <Recipe
                        id={recipe.id}
                        key={recipe.id}
                        title={recipe.title}
                        description={recipe.description}
                        ingredients={recipe.ingredients}
                        instructions={recipe.instructions}
                        image={recipe.image}
                        isFavorite={recipe.isFavorite}
                    />
                )))
            }
        </>
    );
}

export default Recipes;

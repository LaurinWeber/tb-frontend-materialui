import { Title } from '@material-ui/icons';
import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import AccountCard from '../components/AccountCard';
import Payment from '../views/customer/Payment';

//SetUp
let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
})

afterEach(() => {
    // cleanup on exiting
    document.body.removeChild(container);
    container = null;
});


it("check if card displays", () => {
    //Arrange
    //event handlers
    const handleEdit = jest.fn();
    const handleDelete = jest.fn();
    const fakeAccount = {
        firstname: "Hans",
        lastname: "Muster",
        phone: "0797668788",
        skills: [
            {
                category: "ski",
                advanced: true
            },
            {
                category: "snowboard",
                advanced: true
            },
        ]
    }

    //Act
    act(() => {
        render(
            <AccountCard
                account={fakeAccount}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />,
            container);
    });

    //get buttons
    const bEdit = document.querySelector("[data-testid=edit-account]");
    const bDelete = document.querySelector("[data-testid=delete-account]");
    const bExpand = document.querySelector("[data-testid=expand-account-details]");

    //Assert
    expect(bEdit).toBeInTheDocument();
    expect(bDelete).toBeInTheDocument();
    expect(bExpand).toBeInTheDocument();
});



it("check if card displays", () => {
    //Arrange
    //event handlers
    const handleEdit = jest.fn();
    const handleDelete = jest.fn();

    const fakeAccount = {
        firstname: "Hans",
        lastname: "Muster",
        phone: "0797668788",
        skills: [
            {
                category: "ski",
                advanced: true
            },
            {
                category: "snowboard",
                advanced: true
            },
        ]
    }

    //Act
    act(() => {
        render(
            <AccountCard
                account={fakeAccount}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />,
            container);
    });

    //get buttons
    const bEdit = document.querySelector("[data-testid=edit-account]");
    const bDelete = document.querySelector("[data-testid=delete-account]");
    const bExpand = document.querySelector("[data-testid=expand-account-details]");

    //Assert
    expect(bEdit).toBeInTheDocument();
    expect(bDelete).toBeInTheDocument();
    expect(bExpand).toBeInTheDocument();
});


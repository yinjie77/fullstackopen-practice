import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import AddForm from "./addForm";

test("test for new blog form", () => {
    const addBlogs = jest.fn()

    const component = render(
        <AddForm createBlog={addBlogs}/>
    )
    
    const title = component.container.querySelector("#title")
    const form = component.container.querySelector('form')
    fireEvent.change(title,{
        target: {value: 'testing the blogform'}
    })

    

    fireEvent.submit(form)

    expect(addBlogs.mock.calls).toHaveLength(1)
    expect(addBlogs.mock.calls[0][0].title).toBe('testing the blogform')
})

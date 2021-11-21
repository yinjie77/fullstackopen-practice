import React from "react";
import'@testing-library/jest-dom/extend-expect'
import { render ,fireEvent} from "@testing-library/react";
import Blog from "./Blog";

describe('<Blog />',()=>{
    let component
    let blog={
        title:'qwe',
        url:'123',
        likes:7,
        author:'yinjie'
    }
    let mockHandler = jest.fn()
    beforeEach(()=>{
       
     component=render(
            <Blog blog={blog} handleLikes={mockHandler}/>
        )
    })
    
    test('at start the only title are displayed',()=>{

        expect(component.container).toHaveTextContent(blog.title)
        expect(component.container).not.toHaveTextContent(blog.url)
        expect(component.container).not.toHaveTextContent(blog.likes)
        expect(component.container).not.toHaveTextContent(blog.author)
    }
    )
    test('check likes and url',()=>{
        const button = component.getByText('view')
		fireEvent.click(button)

        expect(component.container).toHaveTextContent(blog.likes)
    })
    test('click like twice ',()=>{
        const view=component.getByText('view')
        fireEvent.click(view)

        const like=component.getByText('like')

        fireEvent.click(like)
        fireEvent.click(like)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

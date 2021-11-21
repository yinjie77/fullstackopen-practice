// 不知道为什么，绕过前端登录，所有操作都不会带上token，导致所有操作（command里的createNote带有token可以创建，）都无法进行，所以只能在前端进行输入测试
describe('Blog app',function(){
    beforeEach(function(){
        cy.request('POST','http://localhost:3003/api/testing/reset')
        const user={
            name:'yinjie',
            username:'yinjie77',
            password:'123456'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
        const user2={
            name:'test',
            username:'test',
            password:'test'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user2) 
        cy.visit('http://localhost:3000')
    })
    it('Login form is shown',function(){
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })
    describe('Login',function(){
        it('succeeds with correct credentials',function(){
                cy.get('#loginusername').type('yinjie77')
                cy.get('#loginpassword').type('123456')
                cy.get('#loginbutton').click()

                cy.contains('yinjie77 logged in')
        })
        it('fails with rong credentials',function(){
            cy.get('#loginusername').type('yinjie77')
            cy.get('#loginpassword').type('1111')
            cy.get('#loginbutton').click()

            cy.contains('wrong username or password')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
    describe('when logged in',function(){
        beforeEach(function(){
            cy.get('#loginusername').type('yinjie77')
                cy.get('#loginpassword').type('123456')
                cy.get('#loginbutton').click()
        })
        it('A blog can be created', function() {
            cy.contains('create new blog').click()
           cy.get('#title').type('test')
           cy.get('#author').type('test')
           cy.get('#url').type('test')
           cy.get('#create').click()
           cy.contains('test')
          })
        describe('and a blog exists',function(){
            beforeEach(function(){
                cy.contains('create new blog').click()
                cy.get('#title').type('test')
                cy.get('#author').type('test')
                cy.get('#url').type('test')
                cy.get('#create').click()
            })
            it('user can like a blog',function(){
                cy.contains('view').click()
                cy.contains('like').click()
            })
            it('user who created the blog can delete it', function(){
                cy.contains('view').click()
                cy.get('#removebutton').click()
                 cy.on('window:confirm',() => true)
            })
            it.only('user who did not created the blog cannot delete it', function() {
                cy.contains('logout').click()
                cy.get('#loginusername').type('test')
                cy.get('#loginpassword').type('test')
                cy.get('#loginbutton').click()
                cy.contains('view').click()
                cy.get('#removebutton').click()
                cy.on('window:confirm',() => true)
                
            })
        })

    })
})
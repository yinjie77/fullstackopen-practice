import React from 'react'
import { useQuery ,useMutation} from '@apollo/client'
import { AUTHORS } from '../queries'
import { EDIT_BRON } from '../queries'

const Authors = (props) => {
  const [setBirth]=useMutation(EDIT_BRON,{
    refetchQueries:[{query:AUTHORS}]
  })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const result=useQuery(AUTHORS)

  if (!props.show) {
    return null
  }
  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  const submit=(event)=>{
      event.preventDefault()
      const name=event.target.name.value
      const born=parseInt(event.target.born.value)
      
      setBirth({variables:{name,"setBornTo":born}})
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <select name="name">
            {authors.map((a) => {
              return (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              )
            })}
          </select>
          <div>
            born
            <input
            name='born'
            />
          </div>
          <button>set</button>
        </form>
    </div>
  )
}

export default Authors

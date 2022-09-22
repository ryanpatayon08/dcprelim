import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'

export const View = ({watchs, deleteWatch}) => {
    return watchs.map(watch=>(
        <tr key={watch.watch_name}>
            <td>{watch.watch_name}</td>
            <td>{watch.brand}</td>
            <td>{watch.color}</td>
            <td>{watch.price}</td>
            <td className='delete-btn' onClick={()=>deleteWatch(watch.watch_name )}>
                <Icon icon={trash}/>
            </td>
        </tr>
    ))
}
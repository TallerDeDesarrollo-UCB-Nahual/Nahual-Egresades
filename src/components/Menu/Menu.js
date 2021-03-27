import React, { Component } from 'react'
import { Button, Menu, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Nahual_Table from '../lista-egresades/Tabla';
import Nahual_Estadisticas from '../estadisticas/Estadisticas';
import { useLocation, withRouter } from 'react-router-dom'

export default class Menu_Nahual extends Component {

  state = { 
    activeItem: 'asdasd' 
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            as = {Link} to = '/listaEgresades'
            name='Lista'
            active={activeItem === 'Lista'}
            onClick={this.handleItemClick}
          />
          
          <Menu.Item
            as = {Link} to ='/Estadisticas'
            name='Estadisticas'
            active={activeItem === 'Estadisticas'}
            onClick={this.handleItemClick}
          />
        </Menu>

       
      </div>
    )
  }
}
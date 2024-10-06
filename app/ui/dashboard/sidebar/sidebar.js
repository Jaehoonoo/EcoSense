'use client'
import styles from './sidebar.module.css'
import { BsArrowReturnLeft, BsFolderFill, BsFillFileTextFill, BsFileEarmarkPlusFill, BsYoutube } from "react-icons/bs";
import { GiCardPick } from "react-icons/gi";
import MenuLink from './menuLink/menuLink'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { VscAccount } from "react-icons/vsc";
import { VscGlobe } from "react-icons/vsc";
import { BsX } from 'react-icons/bs'


const menuItems = [
    {
        title: "EcoSense",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <VscAccount />
            },
            {
                title: "Hub",
                path: "/dashboard/hub",
                icon: <VscGlobe />
            },
            
        ]
    },
    {
      list: [
          {
            title: "Back",
            path: "/",
            icon: <BsArrowReturnLeft />
          },
      ]
    }
]

export default function Sidebar({isOpened, handleMenu}) {

  return (
    <div className={`${styles.container} ${
      isOpened 
      ? styles.open 
      : styles.container
    }`}>

      <button className={styles.closeButton} onClick={handleMenu}>
        <BsX size={32} color="black" />
      </button>

      
      <ul className={styles.list}>
        {menuItems.map(cat => (
          <li key={cat.title} onClick={handleMenu}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map(item => (
               <MenuLink item={item} key={item.title} />               
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}
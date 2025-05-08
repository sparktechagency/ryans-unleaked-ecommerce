export default function MobileNavbar({}) {
  return <div>MobileNavbar</div>
}

// <div
//       className={cn(
//         "transition-all duration-300 ease-in-out lg:hidden",
//         squeezeOnScroll ? "px-2 py-3" : "px-0 py-5",
//       )}
//     >
//       {/* Menu Header */}
//       <div className="relative flex items-center justify-between px-4">
//         {/* menu icon */}
//         <button
//           className="w-1/3"
//           onClick={() => setHideMobileMenu(!hideMobileMenu)}
//         >
//           {hideMobileMenu ? (
//             <Menu color="#FE6201" size={24} />
//           ) : (
//             <X color="#FE6201" size={24} />
//           )}
//         </button>

//         {/* center */}
//         <Link href="/" className="w-1/3">
//           <Image src={logoSm} alt="logo" className="mx-auto block" />
//         </Link>

//         {/* right */}
//         <div className="flex w-1/3 items-center justify-end gap-x-4 text-lg font-bold">
//           <div>
//             <div className="flex items-center gap-x-5">
//               <Link href="/cart">
//                 <BsCart3 className="text-xl" />
//               </Link>
//               <button onClick={handleMobileSearch}>
//                 <BsSearch className="text-xl" />
//               </button>
//             </div>

//             {/* search bar */}
//             <AnimatePresence>
//               {!hideMobileSearchBar && (
//                 <motion.div
//                   className="search-bar-container absolute left-16 top-12 z-[9999] w-3/4"
//                   initial={{ y: 10, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   exit={{ y: 10, opacity: 0 }}
//                 >
//                   <div className="relative w-full">
//                     <Input
//                       id="navbar-search-input"
//                       placeholder="What are you looking for?"
//                       className="mx-auto h-12 w-[90%] bg-foundation-black-light pl-4 pr-10 font-medium"
//                       onChange={(e) => dispatch(setSearch(e.target.value))}
//                     />
//                     <Search
//                       className="absolute right-[30px] top-1/2 -translate-y-1/2"
//                       size={20}
//                       role="button"
//                       onClick={() => {
//                         router.push(`/all-products`);
//                         document.getElementById("navbar-search-input").value =
//                           "";
//                       }}
//                     />
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Buyer profile dropdown */}
//           {userId && (
//             <DropdownMenu
//               onOpenChange={() => setHideMobileSearchBar(true)}
//               className=""
//             >
//               <DropdownMenuTrigger className="">
//                 <Avatar>
//                   <AvatarImage src={showImage(user?.image)} />
//                   <AvatarFallback className="bg-primary-black font-bold text-white">
//                     {user?.name ? (
//                       user?.name?.firstName[0]?.toUpperCase()
//                     ) : (
//                       <User size={20} className="text-white" />
//                     )}
//                   </AvatarFallback>
//                 </Avatar>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="z-[99999]">
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <Link
//                     href="/user/profile"
//                     className="flex items-center gap-x-2"
//                   >
//                     <User size={15} /> Profile
//                   </Link>
//                 </DropdownMenuItem>
//                 {showCartWishlist && (
//                   <DropdownMenuItem>
//                     <Link href="/cart" className="flex items-center gap-x-2">
//                       <BsCart3 className="text-sm" /> Cart
//                     </Link>
//                   </DropdownMenuItem>
//                 )}

//                 {showCartWishlist && (
//                   <DropdownMenuItem>
//                     <Link
//                       href="/wishlist"
//                       className="flex items-center gap-x-2"
//                     >
//                       <BsHeart className="text-sm" /> Wishlist
//                     </Link>
//                   </DropdownMenuItem>
//                 )}

//                 <DropdownMenuItem>
//                   <Link
//                     href="/user/settings"
//                     className="flex items-center gap-x-2"
//                   >
//                     <Settings size={15} /> Settings
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Link
//                     href="/user/order-history"
//                     className="flex items-center gap-x-2"
//                   >
//                     <List size={15} />
//                     Order History
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <button
//                     className="flex items-center gap-x-2"
//                     onClick={handleLogout}
//                   >
//                     <LogOut size={15} />
//                     Logout
//                   </button>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu Links */}
//       <div className="absolute left-0 top-[60px] z-[9999] h-auto w-full">
//         <AnimatePresence>
//           {!hideMobileMenu && (
//             <motion.div
//               initial={{ y: "-10%", opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: "-10%", opacity: 0 }}
//             >
//               <motion.ul
//                 className="flex list-none flex-col items-start gap-y-6 border-b border-b-gray-300 bg-white px-4 py-7"
//                 variants={smallMenuVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <motion.li variants={smallMenuLinkVariants}>
//                   <Navlink
//                     route="/home"
//                     setHideMobileMenu={setHideMobileMenu}
//                   >
//                     Home
//                   </Navlink>
//                 </motion.li>
//                 <motion.li variants={smallMenuLinkVariants}>
//                   <Navlink
//                     route="/contact"
//                     setHideMobileMenu={setHideMobileMenu}
//                   >
//                     Contact
//                   </Navlink>
//                 </motion.li>
//                 <motion.li variants={smallMenuLinkVariants}>
//                   <Navlink
//                     route="/about"
//                     setHideMobileMenu={setHideMobileMenu}
//                   >
//                     About Us
//                   </Navlink>
//                 </motion.li>

//                 <motion.li variants={smallMenuLinkVariants}>
//                   <Navlink
//                     route="/all-products"
//                     setHideMobileMenu={setHideMobileMenu}
//                   >
//                     Products
//                   </Navlink>
//                 </motion.li>

//                 {!userId && (
//                   <motion.li variants={smallMenuLinkVariants}>
//                     <Navlink
//                       route="/login"
//                       setHideMobileMenu={setHideMobileMenu}
//                     >
//                       Join Now
//                     </Navlink>
//                   </motion.li>
//                 )}
//               </motion.ul>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

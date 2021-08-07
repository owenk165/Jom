/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext} from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { UserSessionContext } from '../../contexts/UserSession';
import { JomLogo, JomLogo2HDSVG} from '../../assets/index';
import { useHistory, Link } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    const { currentUsername, updateUsername } = useContext(UserSessionContext);
    let history = useHistory();
    var navigation; 

    function logout(e){
        e.preventDefault(); 
        updateUsername('');
        window.location.reload();
    }

    function customRedirect(e, href) {
        e.preventDefault();
        <Link to="/Login/"/>
    }

    if (currentUsername != null || currentUsername == "") {
        navigation = [
            { name: 'Logout', href: 'javascript:;', current: false },
        ]
    } else {
        navigation = [
            { name: 'Login', href: '/Jom/login', current: false },
            { name: 'Register', href: '/Jom/register', current: false },
        ]
    }

    return (
        <Disclosure as="nav" className="bg-gray-800" style={{ backgroundColor:'#242522'}}>
            {({ open }) => (
                <>
                    <div className="max-w-8xl mx-auto px-2 sm:px-2 lg:px-4">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start" onClick={()=>history.push('/')}>
                                <div className="flex-shrink-0 flex items-center">
                                    {/* <img
                                        className="block lg:hidden h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                        alt="Workflow"
                                    /> */}
                                    <img src={JomLogo} className="block lg:hidden h-8 w-auto"/>
                                    <img src={JomLogo2HDSVG} className="hidden lg:block h-8 w-auto" />
                                    {/* <img
                                        className="hidden lg:block h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                        alt="Workflow"
                                    /> */}
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            item.name == 'Logout' ?
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                    onClick={(e) => logout(e)}
                                                >
                                                    {item.name}
                                                </a>
                                            :
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                item.name == 'Logout' ?
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                        onClick={(e)=>logout(e)}
                                    >
                                        {item.name}
                                    </a>
                                :
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </a>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
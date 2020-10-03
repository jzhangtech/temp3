import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretRight} from "@fortawesome/free-solid-svg-icons";

const style = {
    indent: {marginLeft: '25px'},
    arrow: {marginRight: '5px', cursor: 'pointer'},
    propName: {'color': '#9C27B0', fontWeight: 'bold'},
    index: {'color': '#9C27B0'},
    value: {'color': '#3F51B5'}
}


export default function ObjectDisplay(props) {

    const keys = Object.keys(props.obj);

    const RenderValue = (props) => {
        if (typeof props.value === 'object') {
            if (Array.isArray(props.value)) {
                return <RenderArray array={props.value}/>
            } else {
                return <RenderObject obj={props.value}/>
            }
        } else {
            return <RenderSingleValue value={props.value}/>
        }
    }

    const RenderObject = (props) => {
        const [isOpen, setIsOpen] = useState(false);

        return <span>
            <span style={style.arrow}
                  onClick={() => {
                      setIsOpen(!isOpen)
                  }}>
                <FontAwesomeIcon icon={isOpen ? faCaretDown : faCaretRight}/>
            </span>
             <span>{'{'} </span>
            {
                isOpen ? <span>
                        <ObjectDisplay obj={props.obj}/>
                </span> :
                <span style={style.arrow}
                      onClick={() => {setIsOpen(!isOpen)}}>
                    {'.......'}
                </span>
            }
            <span>{'}'}</span>
        </span>
    }

    const RenderArray = (props) => {
        const [isOpen, setIsOpen] = useState(false);

        return <span>
             <span style={style.arrow}
                   onClick={() => {
                       setIsOpen(!isOpen)
                   }}>
                <FontAwesomeIcon icon={isOpen ? faCaretDown : faCaretRight}/>
            </span>
            <span>{'['} </span>
            {
                isOpen ? <span>
                        {
                            props.array.map((p, i) => {
                                return <div key={i} style={style.indent}>
                                    <span style={style.index}>{i} : </span>
                                    <RenderValue value={p} index={i}/>
                                </div>
                            })
                        }
                    </span> :
                    <span style={{cursor: 'pointer'}}
                          onClick={() => {
                              setIsOpen(!isOpen)
                          }}>
                        {'.......'}
                    </span>
            }
            <span>{']'}</span>
        </span>
    }

    const RenderSingleValue = (props) => {
        return <span style={style.value}>
                {`${props.value}`}
            </span>
    }

    return <div>
        {
            keys.map((p, i) => {
                const val = props.obj[p];
                return <section style={style.indent} key={i}>
                    <span style={style.propName}>
                        {p}
                    </span> : <RenderValue value={val} block={false}/>
                </section>
            })
        }
    </div>
}
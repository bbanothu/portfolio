import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { Dropdown } from 'react-bootstrap';
import { Radio, RadioGroup } from 'react-radio-group'

//import "./css/index.css";
//import "./css/index.css";


const AmmenityPassMain = () => {
  const [mounted, setMounted] = useState(true);
  const [allApartments, setAllApartments] = useState({});
  const [oneHundred, setOneHundred] = useState([]);
  const [oneFifty, setOneFifty] = useState([]);

  const [dropdown, setDropDown] = useState([]);
  const [dropDownFiltered, setDropDownFiltered] = useState([]);
  const [password, setPassword] = useState("");
  const [currentUnit, setCurrentUnit] = useState({ unit: "   Select An Apartment" });

  const [accountValidated, setAccountValidated] = useState(false);

  const [dropDownReservatiion, setDropDownReservatiion] = useState([]);
  const [currentReservation, setCurrentReservation] = useState({ name: "Select a reservation type" });


  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");

  const setDropDownValues = (value) => {
    setDropDown(value);
    setDropDownFiltered(value);
  }

  useEffect(() => {
    const timeNow = new Date(Date.now());
    if (mounted) {
      axios.get(
        "https://d1va2v45wuqutp.cloudfront.net/v1/units?scope=kpq3hfxg595e962wda2acanff0&viewpoint=" + timeNow.toISOString()
      ).then((res) => {
        setAllApartments(res.data.items)
        getData(res.data.items)
      })
    }
    setMounted(false);
  });

  const makeRequest = () => {

    console.log(currentUnit);
    console.log(currentReservation)
    let body = {
      unit: currentUnit.scope,
      passcode: password,
      reservation: currentUnit.id,
      date: date,
      time: time,
      policy: currentReservation.policy,
      name: name,
      tel: phone,
      email: email,

    }

    axios.post(
      "https://bbanothupi.ddns.net:3340/addNewRequest",
      body,
    ).then(response => {
      console.log(response);
    });

  }

  const validateAccount = () => {
    const timeNow = new Date(Date.now());
    let urlRequest = "https://d1va2v45wuqutp.cloudfront.net/v1/accounts/auth/tokens?";
    urlRequest += "viewpoint=" + timeNow.toISOString() + "&" + "scope=" + currentUnit.scope + "&" + "subject=" + currentUnit.id + "&" + "password=" + password + "&context=undefined";
    axios.post(urlRequest).then((res) => {
      console.log(res)
      if (res.status === 200) {
        let urlRequest1 = "https://d1va2v45wuqutp.cloudfront.net/v1/permits/policies/issue?";
        urlRequest1 += "scope=" + currentUnit.scope + "&" + "viewpoint=" + timeNow.toISOString() + "&" + "valid=" + timeNow.toISOString().substring(0, 11) + "00:00:00" + "/&public=true&actual=false&slots=true";
        axios.get(urlRequest1).then((res) => {
          if (res.status === 200) {
            let dropDownReservation = [];
            const keys = Object.keys(res.data.policies.items)
            for (const key of keys) {
              let reservations = {
                name: res.data.items[key].permits.title,
                policy: key
              }
              dropDownReservation.push(reservations);
            }
            setDropDownReservatiion(dropDownReservation);
            setAccountValidated(true);
          } else {
          }
        }).catch((e) => {
          setAccountValidated(false);
        }
        )
      } else {
        setAccountValidated(false);
      }
    }).catch((e) => {
      setAccountValidated(false);
    }
    )
  }

  const getData = (data) => {
    const keys = Object.keys(data)
    const oneHundred = [];
    const oneFifty = [];
    for (const key of keys) {
      if (data[key].display) {
        if (data[key].display.substring(0, 2) == "00" && data[key].display.length > 6) {
          const value = {
            code: data[key].id,
            unit: data[key].display,
            ...data[key]
          }
          oneHundred.push(value);
        } else if (data[key].display.substring(0, 2) == "50") {
          const value = {
            code: key,
            unit: data[key].display,
            ...data[key]
          }
          oneFifty.push(value);
        }
      }
    }
    setDropDownValues(oneHundred)
    setOneHundred(oneHundred);
    setOneFifty(oneFifty);
  }

  const changeApartmentNumber = (value) => {
    let filtered = [];
    for (let i = 0; i < dropdown.length; i++) {
      let currentValue = dropdown[i];
      let unitVal = currentValue.unit.substring(3);
      if (unitVal.substring(0, value.length).localeCompare(value) === 0) {
        filtered.push(currentValue);
      }
    }
    setDropDownFiltered(filtered);
    if (filtered.length === 1) {
      if (filtered[0].unit.substring(3).localeCompare(value) === 0) {
        setCurrentUnit(filtered[0])
        console.log(filtered[0])
      }
    }
  }



  return (
    <>
      {Object.keys(allApartments).length > 0 ?
        <div>
          <Card style={{ width: '60%' }}>
            <Card.Body>
              <Card.Title>Select Apartment</Card.Title>
              <Card.Text>


                <RadioGroup name="fruits" onChange={(e) => setDropDownValues(e)}>
                  <Radio defaultChecked={true} value={oneHundred} className="radio-button" />100
                  <Radio value={oneFifty} className="radio-button" style={{ marginLeft: "20px" }} />150
                </RadioGroup>


              </Card.Text>
              <Card.Text>
                <div style={{ display: "inline" }} >
                  <Form.Control
                    style={{ display: "inline", width: "49%" }}
                    size="sm" type="text" placeholder="Enter Apartment Number" onChange={(e) => changeApartmentNumber(e.target.value)} />
                  <Dropdown
                    style={{ display: "inline", width: "49%" }}>
                    <Dropdown.Toggle
                      variant="secondary btn-sm"
                      id="dropdown-basic">
                      {currentUnit.unit}
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ backgroundColor: '#73a47' }}>
                      {dropDownFiltered.map((key) => {
                        return (
                          <Dropdown.Item href="#" onClick={() => setCurrentUnit(key)} >{key.unit.substring(3)}</Dropdown.Item>
                        )
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <Form.Control size="sm" type="text" placeholder="Enter PassCode"
                  onChange={(e) => setPassword(e.target.value)} />

                <Button style={{ marginBottom: '10px' }} onClick={() => validateAccount()}> Validate Account </Button>

                {accountValidated ?
                  <div>
                    <Dropdown
                      style={{ display: "inline", width: "49%" }}>
                      <Dropdown.Toggle
                        variant="secondary btn-sm"
                        id="dropdown-basic">
                        {currentReservation.name}
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ backgroundColor: '#73a47' }}>
                        {dropDownReservatiion.map((key) => {
                          return (
                            <Dropdown.Item href="#" onClick={() => setCurrentReservation(key)} >{key.name}</Dropdown.Item>
                          )
                        })}
                      </Dropdown.Menu>
                    </Dropdown>


                    <Form.Group>
                      <Form.Control size="sm" type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                      <Form.Control size="sm" type="text" onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone #" />
                      <Form.Control size="sm" type="text" onChange={(e) => setDate(e.target.value)} placeholder="Enter Date" />
                      <Form.Control size="sm" type="text" onChange={(e) => setTime(e.target.value)} placeholder="Enter Time" />
                      <Form.Control size="sm" type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                    </Form.Group>
                  </div>
                  :
                  <div> Press validate account </div>

                }

              </Card.Text>
              <Card.Body>
              </Card.Body>
            </Card.Body>
            <Button style={{ paddingLeft: '5px', paddingRight: '5px' }} onClick={() => makeRequest()}> Send Request </Button>
          </Card>




          {/* <Card style={{ width: '40%' }}>
            <Card.Body>
              <Card.Title>Select Apartment</Card.Title>
              <Card.Text>
                <Button style={{ marginRight: '5px', marginBottom: '10px' }} onClick={() => setDropDown(oneHundred)}> 100 </Button>
                <Button style={{ marginBottom: '10px' }} onClick={() => setDropDown(oneFifty)}> 150 </Button>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="secondary btn-sm"
                    id="dropdown-basic">
                    {currentUnit}
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ backgroundColor: '#73a47' }}>
                    {dropdown.map((key) => {
                      return (
                        <Dropdown.Item href="#" onClick={() => setCurrentUnit(key.unit)} >{key.unit}</Dropdown.Item>
                      )
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control size="sm" type="text" placeholder="Enter PassCode" />
              </Card.Text>
              <Card.Body>
                <Card.Title>
                </Card.Title>
                <Form.Group>
                  <Form.Control size="sm" type="text" placeholder="Enter Date" />
                  <Form.Control size="sm" type="text" placeholder="Enter Time" />
                </Form.Group>
                <Card.Text>
                </Card.Text>
              </Card.Body>
            </Card.Body>
            <Button style={{ paddingLeft: '5px', paddingRight: '5px' }} > Send Request </Button>
          </Card> */}

        </div>
        :
        <div>No data</div>
      }
    </>
  )
};

export default AmmenityPassMain;


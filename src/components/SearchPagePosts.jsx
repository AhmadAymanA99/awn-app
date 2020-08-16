import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import axios from 'axios'
import { Spinner } from 'react-bootstrap'
import Post from './Post'
import { Container, Row, Col, InputGroup, FormControl, Form } from 'react-bootstrap'
import ReactPaginate from 'react-paginate';
import { Dropdown } from 'react-bootstrap'
import './style/post.css'
import Footer from './Footer'
import moment from 'moment'
import { AllPostsAPI } from '../Api/PostsApis'

function SearchPagePosts() {
    const [posts, setposts] = useState({
        loading: true,
        error: '',
        postList: []
    })
    const [searchTitle, setSearchTitle] = useState('');
    const [start, setStart] = useState(0);
    const [selectedSort, setselectedSort] = useState('Default: Newly Added');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [SubCategory, setSubCategory] = useState('None')
    const convertToDay = (d) => {
        const day = moment(d.date, "YYYYMMDD").fromNow()
        const days = day[0];
        return days;
    }
    const handleCheck = (e) => {
        setSubCategory(e.target.value)
    }
    const url = (AllPostsAPI)
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setposts({
                    loading: false,
                    postList: res.data,
                    error: ''
                })
            })
            .catch(err => {
                setposts({
                    loading: false,
                    postList: [],
                    error: err.message

                })
            })
    }, [])
    const allPosts =
        posts.postList.filter(post => post.title.toLowerCase().includes(searchTitle.toLowerCase()) || post.description.toLowerCase().includes(searchTitle.toLowerCase()))
            .filter(post => {
                if (selectedCategory === 'All Categories') {
                    return true;
                }
                else
                    return selectedCategory === post.categoryName
            })
            .filter(post => {
                if (SubCategory === 'None') {
                    return true;
                }
                else
                    return SubCategory === post.subCategory
            })
            .filter(post => {
                if (post.status === 'active') {
                    return true;
                }
                else
                    return false;
            })
            .sort((a, b) => {
                if (selectedSort === 'Default: Newly Added') {
                    return true;
                }
                else if (selectedSort === 'Views: Low To High') {
                    return (a.numViews > b.numViews) ? 1 : -1
                }
                else if (selectedSort === 'Views: High To Low') {
                    return (a.numViews > b.numViews) ? -1 : 1
                }
                else if (selectedSort === 'Date: Oldest Added') {
                    return (convertToDay(a.date) < convertToDay(b.date)) ? 1 : -1

                }
                else return true;

            })
    const showedPosts = allPosts.slice(start * 30, (start * 30) + 30).map(poster => {
        return (
            <Col key={poster._id} md={6} lg={6} xl={4} sm={12} xs={12}>
                <Post post={poster} />
            </Col>
        )
    })

    return (
        <div>
            {selectedCategory === "Recycling" && <Container className="subcatcont">
                <p className="subcat">Category</p>
                <hr />
                <Form>
                    <Form.Group as={Row}>
                        <Col sm={10}>
                            <Form.Check
                                defaultChecked
                                type="radio"
                                label="None"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios0"
                                value="None"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Paper"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                value="Paper"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Plastic"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                value="Plastic"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Glass"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                                value="Glass"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Metal"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios4"
                                value="Metal"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Carton"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios5"
                                value="Carton"
                                onChange={handleCheck}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Container>}
            {selectedCategory === "Volunteering" && <Container className="subcatcont">
                <p className="subcat">Category</p>
                <hr />
                <Form>
                    <Form.Group as={Row}>
                        <Col sm={10}>
                            <Form.Check
                                defaultChecked
                                type="radio"
                                label="None"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios0"
                                value="None"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Teaching"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                value="Teaching"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Sports"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                value="Sports"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Work"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                                value="Work"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Help elders"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios4"
                                value="Help Elders"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Help Orphans"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios5"
                                value="Help orphans"
                                onChange={handleCheck}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Container>}
            {selectedCategory === "Donation" && <Container className="subcatcont">
                <p className="subcat">Category</p>
                <hr />
                <Form>
                    <Form.Group as={Row}>
                        <Col sm={10}>
                            <Form.Check
                                defaultChecked
                                type="radio"
                                label="None"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios0"
                                value="None"
                                onChange={handleCheck}
                            />

                            <Form.Check
                                style={{ fontWeight: "bold", color: "red" }}
                                type="radio"
                                label="Blood Plasma"
                                name="formHorizontalRadios"
                                id="formHorizontalRadiosplasma"
                                value="Blood Plasma"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Medical bills"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                value="Medical Bills"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Home Furniture"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                value="Home Furniture"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Sports"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                                value="Sports"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Clothes"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios4"
                                value="Clothes"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Kitchen"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios5"
                                value="Kitchen"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Electronics"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios6"
                                value="Electronics"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Tools"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios7"
                                value="Tools"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Toys"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios8"
                                value="Toys"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Home Applicances"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios9"
                                value="Home Applicances"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Jewelry"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios10"
                                value="Jewelry"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Books"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios11"
                                value="Books"
                                onChange={handleCheck}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Container>}
            {selectedCategory === "All Categories" && <Container className="subcatcont">
                <p className="subcat">Category</p>
                <hr />
                <Form>
                    <Form.Group as={Row}>
                        <Col sm={10}>
                            <Form.Check
                                defaultChecked
                                type="radio"
                                label="None"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios0"
                                value="None"
                                onChange={handleCheck}
                            />
                            <hr />
                            <p style={{ fontWeight: "bold" }}>Donation</p>
                            <Form.Check
                                style={{ fontWeight: "bold", color: "red" }}
                                type="radio"
                                label="Blood Plasma"
                                name="formHorizontalRadios"
                                id="formHorizontalRadiosplasma"
                                value="Blood Plasma"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Medical bills"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                value="Medical Bills"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Home Furniture"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                value="Home Furniture"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Sports"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                                value="Sports"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Clothes"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios4"
                                value="Clothes"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Kitchen"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios5"
                                value="Kitchen"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Electronics"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios6"
                                value="Electronics"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Tools"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios7"
                                value="Tools"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Toys"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios8"
                                value="Toys"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Home Applicances"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios9"
                                value="Home Applicances"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Jewelry"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios10"
                                value="Jewelry"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Books"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios11"
                                value="Books"
                                onChange={handleCheck}
                            />
                            <hr />
                            <p style={{ fontWeight: "bold" }}>Volunteering</p>
                            <Form.Check
                                type="radio"
                                label="Teaching"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios12"
                                value="Teaching"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Sports"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios13"
                                value="Sports"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Work"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios14"
                                value="Work"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Help elders"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios20"
                                value="Help Elders"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Help Orphans"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios21"
                                value="Help orphans"
                                onChange={handleCheck}
                            />
                            <hr />
                            <p style={{ fontWeight: "bold" }}>Recycling</p>
                            <Form.Check
                                type="radio"
                                label="Paper"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios15"
                                value="Paper"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Plastic"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios16"
                                value="Plastic"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Glass"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios17"
                                value="Glass"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Metal"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios18"
                                value="Metal"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Carton"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios19"
                                value="Carton"
                                onChange={handleCheck}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Container>}
            <Container className="contNL">
                <div>
                    <Row style={{ marginTop: "30px", marginLeft: "40px" }}>
                        <Col md="7">
                            <InputGroup >
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Search</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl onChange={(e) => { setSearchTitle(e.target.value); setStart(0); }} placeholder={"Seach Title or Description"} />
                            </InputGroup>
                        </Col>
                        <Col md="auto" >
                            <Dropdown >
                                <Dropdown.Toggle style={{ backgroundColor: "#009899", border: "none" }} id="dropdown-basic">
                                    {selectedCategory}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as="button" onSelect={() => { setSelectedCategory('Donation'); setStart(0); setSubCategory("None"); }}>Donation</Dropdown.Item>
                                    <Dropdown.Item as="button" onSelect={() => { setSelectedCategory('Volunteering'); setStart(0); setSubCategory("None"); }}>Volunteering</Dropdown.Item>
                                    <Dropdown.Item as="button" onSelect={() => { setSelectedCategory('Recycling'); setStart(0); setSubCategory("None"); }}>Recycling</Dropdown.Item>
                                    <Dropdown.Item as="button" onSelect={() => { setSelectedCategory('All Categories'); setStart(0); setSubCategory("None"); }}>All Categories</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col md="auto">
                            <Dropdown >
                                <Dropdown.Toggle style={{ backgroundColor: "#009899", border: "none" }} id="dropdown-basic">
                                    {selectedSort}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as="button" onSelect={() => { setselectedSort('Date: Oldest Added'); setStart(0); }}>Date: Oldest Added</Dropdown.Item>
                                    <Dropdown.Item as="button" onSelect={() => { setselectedSort('Date: Newly Added'); setStart(0); }}>Date: Newly Added</Dropdown.Item>
                                    <Dropdown.Item as="button" onSelect={() => { setselectedSort('Views: Low To High'); setStart(0); }}>Views: Low To High</Dropdown.Item>
                                    <Dropdown.Item as="button" onSelect={() => { setselectedSort('Views: High To Low'); setStart(0); }}> Views: High To Low</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </div>
                <div>
                    {posts.loading &&
                        <Row className="justify-content-md-center" >
                            <Spinner style={{ marginTop: "100px", marginBottom: "750px" }} animation="grow" variant="success" />
                        </Row>}
                    {posts.error &&
                        <Row className="justify-content-md-center" style={{ marginTop: "100px", marginBottom: "750px" }}>
                            <h3 style={{ color: "red" }}>{posts.error}</h3>
                        </Row>}
                    {!posts.error && !posts.loading &&
                        <div>
                            <Row style={{ marginTop: "30px", marginLeft: "50px" }}>
                                {showedPosts}
                            </Row>

                            <Row className="paginateRow">
                                <ReactPaginate
                                    breakClassName={'page-item'} breakLinkClassName={'page-link'} containerClassName={'pagination'} pageClassName={'page-item'} pageLinkClassName={'page-link'} previousClassName={'page-item'} previousLinkClassName={'page-link'} nextClassName={'page-item'} nextLinkClassName={'page-link'} activeClassName={'active'}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={4}
                                    pageCount={allPosts.length / 30}
                                    onPageChange={(num) => {
                                        setStart(num.selected)
                                        window.scrollTo(0, 0)
                                    }}
                                    forcePage={start}
                                />
                            </Row>

                        </div>}
                </div>
            </Container>



        </div>
    )
}

export default SearchPagePosts


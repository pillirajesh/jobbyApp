import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {profile: {}}

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const updatedData = data.profile_details
    this.setState({profile: updatedData})
  }

  render() {
    const {profile} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div>
          <div className="container">
            <div className="profile-container">
              <img
                src={profile.profile_image_url}
                alt={profile.name}
                className="profile-image"
              />
              <h1 className="profile-heading">{profile.name}</h1>
              <p className="profile-paragraph">{profile.short_bio}</p>
            </div>
            <hr className="line" />
            <h1 className="employment-type-heading">Employment Type</h1>
            <ul className="employment-un-ordered-list-container ">
              {employmentTypesList.map(eachJob => (
                <li
                  key={eachJob.employmentTypeId}
                  className="employment-list-container"
                >
                  <input type="checkbox" id="jobType" />
                  <label htmlFor="jobType" className="job">
                    {eachJob.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="line" />
            <h1 className="employment-type-heading">Salary Range</h1>
            <ul className="employment-un-ordered-list-container ">
              {salaryRangesList.map(eachSalary => (
                <li
                  key={eachSalary.salaryRangeId}
                  className="employment-list-container"
                >
                  <input type="radio" id="salaryRange" />
                  <label htmlFor="salaryRange" className="job">
                    {eachSalary.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs

// import userEvent from '@testing-library/user-event';
import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { articlesURL } from '../utils/constant';
import { withRouter } from 'react-router';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articlesList: [],
    };
  }
  componentDidMount = async () => {
    try {
      await fetch(
        'https://mighty-oasis-08080.herokuapp.com/api/articles?author=' +
          this.props.user.username
      )
        .then((res) => res.json())
        .then(
          (data) => console.log(data)
          // this.setState({
          //   articlesList: data.articles,
          // })
        );
    } catch (error) {
      console.log(error);
    }
  };
  handleDelete = (slug) => {
    let storageKey = localStorage['app__user'];
    fetch(articlesURL + '/' + slug, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${storageKey}`,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        } else {
          this.props.history.push(`/`);
        }
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };
  render() {
    console.log(this.props.user.username);
    let { username, bio, image, email } = this.props.user;
    return (
      <>
        <div class='rounded-3xl overflow-hidden shadow-xl max-w-xs my-3 bg-white profile__card'>
          <img
            src='https://i.imgur.com/dYcYQ7E.png'
            class='w-full'
            alt='background'
          />
          <div class='flex justify-center -mt-8'>
            <img
              src={image}
              class='rounded-full border-solid border-white border-2 -mt-3 max-h-25'
              alt='profile'
            />
          </div>
          <div class='text-center px-3 pb-6 pt-2'>
            <h3 class='text-black text-sm bold font-sans'>{username}</h3>
            <h4 class='mt-2 font-sans font-light text-sm bold text-black'>
              {bio}
            </h4>
            <p class='mt-2 font-sans font-light text-black'>{email}</p>
          </div>
          <div class='flex justify-center pb-3 text-black'>
            <div class='text-center mr-3 border-r pr-3'>
              <h2>
                {this.state?.articlesList ? this.state?.articlesList.length : 0}
              </h2>
              <span>Articles</span>
            </div>
            <div class='text-center'>
              <h2>0</h2>
              <span>Followers</span>
            </div>
          </div>
        </div>
        <div className='your__articles '>
          {this.state.articlesList.map((eachArticle) => (
            <div className='py-8 flex flex-wrap md:flex-nowrap article'>
              <div className='md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col each-one'>
                <span className='font-semibold title-font text-gray-700'>
                  <img
                    className='author__image'
                    src={eachArticle.author.image}
                    alt='profile pic'
                  />
                  <p>
                    {eachArticle.author.username} in
                    <span> {eachArticle.tagList[0]}</span>
                  </p>
                </span>
                <span className='mt-1 text-gray-500 text-sm'>
                  {moment(eachArticle?.updatedAt).format('MMM Do YY')}
                </span>
              </div>

              <div className='md:flex-grow '>
                <h2 className='text-2xl font-medium text-gray-900 title-font mb-2'>
                  {eachArticle.title}
                </h2>
                <p className='leading-relaxed'>{eachArticle.description}</p>
                <strong className='like__image'>
                  <img src='./images/heart.svg' alt='like button' />
                </strong>
                <NavLink to={`/articles/${eachArticle.slug}`}>
                  <button className='text-indigo-500 inline-flex items-center mt-4  px-3 py-1 border rounded-md m-2 '>
                    Read More
                    <svg
                      className='w-4 h-4 ml-2'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      stroke-width='2'
                      fill='none'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    >
                      <path d='M5 12h14'></path>
                      <path d='M12 5l7 7-7 7'></path>
                    </svg>
                  </button>
                </NavLink>
                <NavLink to={`/edit/articles/${eachArticle.slug}`}>
                  <button className='text-indigo-500 inline-flex items-center mt-4 px-3 py-1 m-2 border rounded-md'>
                    Edit
                    <svg
                      className='w-4 h-4 ml-2'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      stroke-width='2'
                      fill='none'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    >
                      <path d='M5 12h14'></path>
                      <path d='M12 5l7 7-7 7'></path>
                    </svg>
                  </button>
                </NavLink>

                <button
                  className='text-indigo-500 inline-flex items-center mt-4 px-3 py-1 border rounded-md m-2'
                  onClick={() => this.handleDelete(eachArticle.slug)}
                >
                  Delete
                  <svg
                    className='w-4 h-4 ml-2'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    stroke-width='2'
                    fill='none'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path d='M5 12h14'></path>
                    <path d='M12 5l7 7-7 7'></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default withRouter(Profile);

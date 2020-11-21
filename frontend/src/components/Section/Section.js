import React from 'react'
import './Section.css'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

const Layout = ({ post, layout }) => {
  return (
    <>
      {post.sections.map(section => (
        <section
          key={section.sectionId}
          className={`section ${layout}`}
          style={{ backgroundImage: section.image && `url(${section.image})` }}>
          {section.title || section.text ? (
            <div className='centered-text'>
              {section.title ? (
                <h1 style={{ fontFamily: section.font }}>{section.title}</h1>
              ) : null}
              {section.text ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: md.render(section.text),
                  }}></div>
              ) : null}
            </div>
          ) : null}
        </section>
      ))}
    </>
  )
}

export default Layout

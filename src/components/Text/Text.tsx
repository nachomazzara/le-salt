import React, { PureComponent } from 'react'

import './Text.css'

export type TextProps = { text: string; className?: string }

export default class Text extends PureComponent<TextProps> {
  textarea: { [key: string]: any } = {}

  copyTopic = () => {
    this.textarea[this.props.text].select()
    document.execCommand('copy')
  }

  render() {
    const { text, className } = this.props

    return (
      <div className="text-wrapper">
        <textarea
          readOnly
          ref={textarea => {
            if (textarea) {
              textarea!.style.height = textarea!.scrollHeight + 'px'
              this.textarea[text] = textarea
            }
          }}
          value={text}
          className={className || ''}
        />
        {text.length > 0 && (
          <button className="copy-button" onClick={this.copyTopic}>
            {'[copy]'}
          </button>
        )}
      </div>
    )
  }
}

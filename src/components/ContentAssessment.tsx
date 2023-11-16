<main>
<div className="container mx-auto">
  <h1 className="text-3xl sm:text-4xl my-5">質問の理解度確認</h1>
  <div className="textStyle">
    <p>
     これまでの質問についてどのくらい理解しているか、ご自身の感覚に最も近い選択を以下から選んでください。
    </p>s
  </div>

  <div
      className={
        "mb-5 flex " + (assess_cond ? "flex-col" : "flex-col-reverse")
      }
    >
      <div className="assessment_radio_button flex mb-1">
        <div className="mr-1">
          <input
            type="radio"
            id="1"
            name="assessment"
            value="1"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="1">1(相手にとても有利)</label>
        </div>
      </div>

      <div className="assessment_radio_button flex mb-1">
        <div className="mr-1">
          <input
            type="radio"
            id="2"
            name="assessment"
            value="2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="2">2(相手に有利)</label>
        </div>
      </div>

      <div className="assessment_radio_button flex mb-1">
        <div className="mr-1">
          <input
            type="radio"
            id="3"
            name="assessment"
            value="3"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="3">3(相手に少し有利)</label>
        </div>
      </div>

      <div className="assessment_radio_button flex mb-1">
        <div className="mr-1">
          <input
            type="radio"
            id="4"
            name="assessment"
            value="4"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="4">4(公平)</label>
        </div>
      </div>

      <div className="assessment_radio_button flex mb-1">
        <div className="mr-1">
          <input
            type="radio"
            id="5"
            name="assessment"
            value="5"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="5">5(自分に少し有利)</label>
        </div>
      </div>
      <div className="assessment_radio_button flex mb-1">
        <div className="mr-1">
          <input
            type="radio"
            id="6"
            name="assessment"
            value="6"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="6">6(自分に有利)</label>
        </div>
      </div>

      <div className="assessment_radio_button flex mb-1">
        <div className="mr-1">
          <input
            type="radio"
            id="7"
            name="assessment"
            value="7"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="7">7(自分にとても有利)</label>
        </div>
      </div>
    </div>

  <Link className="inputStyle" href={`/${sessionID}/profile`}>
    回答者情報の入力
  </Link>

</div>
</main>
const urlify = require('./utils')

const description = 'format string as url' 

test(description,() => {
    expect(
        urlify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7",
            "Indiranagar 12th main"
        )
    ).toBe(
        "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Indiranagar+12th+main"    
    )
})

test(description,() => {
    expect(
        urlify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7",
            "Koramangala 12th main"
        )
    ).toBe(
        "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Koramangala+12th+main"    
    ) 
})

test(description,() => {
    expect(
        urlify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7",
            "Banshankari 6th main"
        )
    ).toBe(
        "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Banshankari+6th+main"    
    ) 
})

test(description,() => {
    expect(
        urlify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7",
            " Banshankari 6th main"
        )
    ).toBe(
        "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Banshankari+6th+main"    
    ) 
})

test(description,() => {
    expect(
        urlify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7",
            "Koramangala 12th main "
        )
    ).toBe(
        "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Koramangala+12th+main"    
    ) 
})

test(description,() => {
    expect(
        urlify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7",
            "Koramangala  12th  main"
        )
    ).toBe(
        "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Koramangala+12th+main"    
    ) 
})

test(description,() => {
    expect(
        urlify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7",
            "  Koramangala   12th   main  "
        )
    ).toBe(
        "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Koramangala+12th+main"    
    ) 
})
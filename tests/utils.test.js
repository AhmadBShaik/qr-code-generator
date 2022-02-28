const { URLify, parentOfAddress,toIndividualAddresses } = require('./utils')

const URLifyDescription = 'proper url formatting' 
const parentOfAddressDescription = 'return last part of URL'
const toIndividualAddressDescription = 'split the string seperated by pipes into individual addresses'

test(URLifyDescription,() => {
    expect(
        URLify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7",
            ["Indiranagar 12th main"]
        )
    ).toBe(
        "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Indiranagar+12th+main"    
    )
})

test(URLifyDescription,() => {
    expect(
        URLify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7",
            ["Koramangala 12th main"]
        )
    ).toBe(
        "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Koramangala+12th+main"    
    ) 
})

test(URLifyDescription,() => {
    expect(
        URLify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7",
            ["Banshankari 6th main"]
        )
    ).toBe(
        "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Banshankari+6th+main"    
    ) 
})

test(URLifyDescription,() => {
    expect(
        URLify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7",
            [" Banshankari 6th main"]
        )
    ).toBe(
        "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Banshankari+6th+main"    
    ) 
})

test(URLifyDescription,() => {
    expect(
        URLify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7",
            ["Koramangala 12th main "]
        )
    ).toBe(
        "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Koramangala+12th+main"    
    ) 
})

test(URLifyDescription,() => {
    expect(
        URLify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7",
            ["Koramangala  12th  main"]
        )
    ).toBe(
        "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Koramangala+12th+main"    
    ) 
})

test(URLifyDescription,() => {
    expect(
        URLify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7",
            ["  Koramangala   12th   main  "]
        )
    ).toBe(
        "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Koramangala+12th+main"    
    ) 
})


test(URLifyDescription,() => {
    expect(
        URLify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Koramangala+12th+main",
            [" Indiranagar   6th   main  "]
        )
    ).toBe(
        "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Koramangala+12th+main&source=Indiranagar+6th+main"    
    ) 
})

test(URLifyDescription,() => {
    expect(
        URLify(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Koramangala+12th+main&source=Indiranagar+6th+main" ,   
            [" Koramangal   8th   main  "]
            )
    ).toBe(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Koramangala+12th+main&source=Indiranagar+6th+main&source=Koramangal+8th+main" ,   
        
    ) 
})


test(parentOfAddressDescription,() => {
    expect(
        parentOfAddress(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7/"
        )
    ).toBe(
        "yoga-with-yamini-thyroid-7"
    ) 
})

test(parentOfAddressDescription,() => {
    expect(
        parentOfAddress(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7"
        )
    ).toBe(
        "yoga-with-yamini-thyroid-7"
    ) 
})

test(parentOfAddressDescription,() => {
    expect(
        parentOfAddress(
            ""
        )
    ).toBe(
        ""    
    ) 
})

test(parentOfAddressDescription,() => {
    expect(
        parentOfAddress(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Indiranagar+12th+main"
        )
    ).toBe(
        "yoga-with-yamini-thyroid-7"
    ) 
})

test(parentOfAddressDescription,() => {
    expect(
        parentOfAddress(
            "https://naveen.roringo.com/communities/yoga-with-yamini-thyroid-7?source=Indiranagar+12th+main&source=Gandhinagar+7th+main"
        )
    ).toBe(
        "yoga-with-yamini-thyroid-7"
    ) 
})

test(toIndividualAddressDescription,() => {
    expect(
        toIndividualAddresses(
            "Koramangala 12th main|Bansankari 6th main"   
        )
    ).toEqual(
        ["Koramangala 12th main","Bansankari 6th main"]
    ) 
})

test(toIndividualAddressDescription,() => {
    expect(
        toIndividualAddresses(
            "Koramangala 12th main | Bansankari 6th main| Santhinagar 2nd main"   
        )
    ).toEqual(
        ["Koramangala 12th main ", " Bansankari 6th main", " Santhinagar 2nd main"]
    ) 
})